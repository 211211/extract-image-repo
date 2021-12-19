# Introduction

This repository holds the code for the EduBao SearchService which enables the user
of the university portal to search and filter for universities and study programs.

# Setting up development environment

1. Install node js for your system (12.X recommended)
2. Clone the project

```bash
$ git clone git@ssh.dev.azure.com:v3/edubao/EDUBAO/Edubao.Search.Service
$ cd Edubao.Search.Service
$ npm i

# Builds the entire application with routes and everything
$ npm run build

# Starts the service in development mode.
# Recompiles on every save.
# Changes that were made to the controllers like
# * new routes
# * change of parameters
# could not be detected automatically. You have
# to run npm run build in such cases
$ npm start
```

## Dependencies

- Running ELK stack

```bash
# For development we currently use ELK in a docker container
# https://elk-docker.readthedocs.io/
$ docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -it --name elk sebp/elk
```

# Use built in mechanics

The used service template offers some built in mechanics that can be used to speed app service development.

## Create REST controller

REST Controllers must be created in `./src/1 - REST Interface/Controllers/*Controller.ts`. Otherwise they will not be found by the system. Every Controller must extends the `Controller` class of the `tsoa` package.

The following example shows almost any annotations that are provided by `tsoa`. To secure a route you can use the `@Security()` annotation. The service template brings an implemented security strategy which needs a running authentication service in the network (`./src/Modules/authentication.ts`).

```ts
import express from "express";
import {
  Controller,
  Route,
  Post,
  Delete,
  Body,
  SuccessResponse,
  Path,
  Request,
  Security,
} from "tsoa";
import { inject } from "inversify";
import { IUserDto } from "../DTOs/IUserDto";
import { IAuthService } from "../../2 - Domain/Services/AuthService";
import NotAllowedException from "../../2 - Domain/Exceptions/NotAllowedException";
import NotFoundException from "../../2 - Domain/Exceptions/NotFoundException";

@Route("/")
export class AuthController extends Controller {
  private readonly _authService: IAuthService;

  constructor(@inject("IAuthService") authService: IAuthService) {
    super();
    this._authService = authService;
  }

  @Post()
  @SuccessResponse(200)
  public async CreateToken(@Body() loginRequest: IUserDto): Promise<string> {
    const response = await this._authService.CheckCredentials(
      loginRequest.Email,
      loginRequest.Password
    );

    if (!response.IsValid) {
      this.setStatus(401);
      return;
    }

    const token = await this._authService.CreateTokenForUser(
      response.UserId,
      response.Roles
    );
    return token;
  }

  @Delete("all/")
  @Security("Bearer", ["registered"])
  public async RevokeAllTokens(
    @Request() request: express.Request
  ): Promise<void> {
    await this._authService.RevokeAllTokensForUser(request.user.id);
  }

  @Delete("{tokenId}")
  @Security("Bearer", ["registered"])
  public async RevokeToken(
    @Path() tokenId: string,
    @Request() request: express.Request
  ): Promise<void> {
    try {
      await this._authService.RevokeTokenForUser(tokenId, request.user.id);
    } catch (err) {
      if (err instanceof NotAllowedException) this.setStatus(403);
      else if (err instanceof NotFoundException) this.setStatus(404);
      else this.setStatus(500);
    }
  }
}
```

Every Controller must be registered by the DI Container. The used DI Container by the template is `inversify.js`. You can register a controller as follows (in `./src/Modules/ioc-container.js`)

```ts
iocContainer
  .bind<AuthController>(AuthController)
  .to(AuthController)
  .inTransientScope();
```

## Create Bus Worker

Bus Worker are classes that listen for specific events on the bus system. Whenever the event occurs that they are listening for they will execute the predefined code. The example shows a bus worker that will be called whenever a user resetted a password.

```ts
import { injectable, inject } from "inversify";
import { IWorker } from "@aye/infrastructure.services.communication";
import { IUnitOfWork } from "@aye/infrastructure.database.unitofwork";
import { IPasswordResettedDto } from "./DTOs/IPasswordResettedDto";
import { IAuthService } from "../Services/AuthService";

export interface IPasswordResetWorker {}

@injectable()
export class PasswordResetWorker
  implements IPasswordResetWorker, IWorker<IPasswordResettedDto> {
  private readonly _authService: IAuthService;

  constructor(@inject("IAuthService") authService: IAuthService) {
    this._authService = authService;
    this.HandleMessage = this.HandleMessage.bind(this);
  }

  public async HandleMessage(message: IPasswordResettedDto): Promise<void> {
    await this._authService.RevokeAllTokensForUser(message.UserId);
  }
}
```

This class only describes what should be executed. The worker must be registered as a bus worker. That is done in `./src/registerServices.ts`.

```ts
import {
  IService,
  IWorker,
} from "@aye/infrastructure.services.communication/build/CommunicationService";

import CommunicationService from "@aye/infrastructure.services.communication";
import { IPasswordResettedDto } from "./2 - Domain/Workers/DTOs/IPasswordResettedDto";
import { iocContainer } from "./Modules/ioc-container";

export async function RegisterServices() {
  try {
    // Connect to bus
    await CommunicationService.Connect({
      Host: "localhost",
      Port: 6379,
    });

    // Get handler from ioc container
    const passwordResetWorker = iocContainer.get<IWorker<IPasswordResettedDto>>(
      "IPasswordResetWorker"
    );

    // Attach to event
    CommunicationService.Subscribe(
      "user:passwordResetted",
      passwordResetWorker
    );
  } catch (err) {
    console.log("ERROR!!!");
    console.log(err);

    process.exit(1);
  }
}
```

## Create Bus Services

Bus services are very similar to bus workers but they return a value. They are used whenever the caller needs a result. Everything that can be done by a bus service can be achieved by a REST call. So it is more a question of taste what to use in this scenario. One advantage of bus services is, that they do not need authentication nor authorization.

Like a bus worker we need once again two parts. The following example shows the service itself.

```ts
import { inject, injectable } from "inversify";

import { IService } from "@aye/infrastructure.services.communication/build/CommunicationService";
import { IUnitOfWork } from "@aye/infrastructure.database.unitofwork";
import { User } from "../../3 - Database/Models/User";
import { iocContainer } from "../../Modules/ioc-container";
import jwt from "jsonwebtoken";

export interface IAuthInternalService {}

export interface ITokenValidRequest {
  Token: string;
}

export interface ITokenValidResponse {
  IsValid: boolean;
  DecodedToken: JWT;
}

interface JWT {
  id: string;
  scopes: string[];
}

@injectable()
export class AuthInternalService
  implements
    IAuthInternalService,
    IService<ITokenValidRequest, ITokenValidResponse> {
  public async HandleRequest(
    requestObject: ITokenValidRequest
  ): Promise<ITokenValidResponse> {
    // Getting a fresh uow for every internal request
    const unitOfWork = iocContainer.get<IUnitOfWork>("IUnitOfWork");

    console.log("[INTERNAL]", "Receiving request");
    let result = false;

    if (!requestObject.Token)
      return {
        IsValid: false,
        DecodedToken: undefined,
      };

    try {
      // First decode the token and check if it was issued by us
      var decoded = jwt.verify(
        requestObject.Token,
        process.env.JWT_SECRET_KEY
      ) as JWT;

      await unitOfWork.Execute(async () => {
        const userRepo = await unitOfWork.GetRepository(User);
        const user = await userRepo.findOne(decoded.id);

        if (user) {
          const tokens = await user.Tokens;
          const token = tokens.find((t) => t.Value === requestObject.Token);

          if (token && !token.Revoked) result = true;
        } // If we do not find a user someone wants to fake his identity
      });

      console.log("[INTERNAL]", "Sending response");
      return {
        IsValid: result,
        DecodedToken: decoded,
      };
    } catch (err) {
      // Token was not issued by us
      console.error(err);
      console.log("[INTERNAL]", "Sending response");
      return {
        IsValid: false,
        DecodedToken: undefined,
      };
    }
  }
}
```

And again the service must be registered. Again very similar but a bit different:

```ts
import {
  IService,
  IWorker,
} from "@aye/infrastructure.services.communication/build/CommunicationService";
import {
  ITokenValidRequest,
  ITokenValidResponse,
} from "./2 - Domain/Services/AuthInternalService";

import CommunicationService from "@aye/infrastructure.services.communication";
import { iocContainer } from "./Modules/ioc-container";

export async function RegisterServices() {
  try {
    // Second we try to connect to the Redis Server with our Background Worker
    await CommunicationService.Connect({
      Host: "localhost",
      Port: 6379,
    });

    const tokenIsValidServiceInternal = iocContainer.get<
      IService<ITokenValidRequest, ITokenValidResponse>
    >("IAuthInternalService");

    CommunicationService.OfferService(
      "auth:isTokenValid",
      tokenIsValidServiceInternal
    );
  } catch (err) {
    console.log("ERROR!!!");
    console.log(err);

    process.exit(1);
  }
}
```

## Access Database

TBD

# Changelog

## Version 0.0.1

- Initial release

# License

> This project is not licensed as open source project. Redistribution is prohibited.
