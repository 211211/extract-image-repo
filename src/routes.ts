/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NewSearchController } from './1 - REST Interface/Controllers/NewSearchController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SearchController } from './1 - REST Interface/Controllers/SearchController';
import { iocContainer } from './Modules/ioc-container';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IUniversityDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "logo": {"dataType":"string","required":true},
            "founding_year": {"dataType":"string","required":true},
            "location": {"dataType":"string","required":true},
            "tuition_fee": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "sponsorship": {"dataType":"string","required":true},
            "application_organization": {"dataType":"string","required":true},
            "number_of_students": {"dataType":"double","required":true},
            "financial_segment": {"dataType":"string","required":true},
            "slug": {"dataType":"string","required":true},
            "core_study_program_slug": {"dataType":"string","required":true},
            "premium": {"dataType":"boolean","required":true},
            "city": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISearchResultDto_IUniversityDto_": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double","required":true},
            "skip": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IUniversityDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStudyProgramDetailDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "location": {"dataType":"string","required":true},
            "core_study_program_slug": {"dataType":"string","required":true},
            "languages": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "graduation": {"dataType":"string","required":true},
            "study_forms": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "admission_semesters": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "financial_segment": {"dataType":"string","required":true},
            "university": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"slug":{"dataType":"string","required":true},"logo":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},
            "slug": {"dataType":"string","required":true},
            "approval_mode": {"dataType":"string","required":true},
            "category_ids": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISearchResultDto_IStudyProgramDetailDto_": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double","required":true},
            "skip": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IStudyProgramDetailDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICombinedSearchResultDto": {
        "dataType": "refObject",
        "properties": {
            "university": {"ref":"ISearchResultDto_IUniversityDto_","required":true},
            "program": {"ref":"ISearchResultDto_IStudyProgramDetailDto_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StudentNumber": {
        "dataType": "refEnum",
        "enums": [0,1,2,3],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/new-search',
            function NewSearchController_Search(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                    take: {"default":10,"in":"query","name":"take","dataType":"double"},
                    content_language: {"default":"en","in":"query","name":"content_language","dataType":"string"},
                    name: {"in":"query","name":"name","dataType":"string"},
                    uni_assist: {"in":"query","name":"uni_assist","dataType":"string"},
                    admission_semesters: {"in":"query","name":"admission_semesters","dataType":"string"},
                    uni_control: {"in":"query","name":"uni_control","dataType":"string"},
                    uni_types: {"in":"query","name":"uni_types","dataType":"string"},
                    study_degrees: {"in":"query","name":"study_degrees","dataType":"string"},
                    study_forms: {"in":"query","name":"study_forms","dataType":"string"},
                    study_langs: {"in":"query","name":"study_langs","dataType":"string"},
                    study_fee: {"in":"query","name":"study_fee","dataType":"string"},
                    approval: {"in":"query","name":"approval","dataType":"string"},
                    category_ids: {"in":"query","name":"category_ids","dataType":"string"},
                    university_ids: {"in":"query","name":"university_ids","dataType":"string"},
                    cities: {"in":"query","name":"cities","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<NewSearchController>(NewSearchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.Search.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/search',
            function SearchController_Search(request: any, response: any, next: any) {
            const args = {
                    skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                    take: {"default":10,"in":"query","name":"take","dataType":"double"},
                    content_language: {"default":"en","in":"query","name":"content_language","dataType":"string"},
                    name: {"in":"query","name":"name","dataType":"string"},
                    uni_assist: {"in":"query","name":"uni_assist","dataType":"string"},
                    admission_semesters: {"in":"query","name":"admission_semesters","dataType":"string"},
                    uni_control: {"in":"query","name":"uni_control","dataType":"string"},
                    uni_types: {"in":"query","name":"uni_types","dataType":"string"},
                    study_degrees: {"in":"query","name":"study_degrees","dataType":"string"},
                    study_forms: {"in":"query","name":"study_forms","dataType":"string"},
                    study_langs: {"in":"query","name":"study_langs","dataType":"string"},
                    study_fee: {"in":"query","name":"study_fee","dataType":"string"},
                    approval: {"in":"query","name":"approval","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<SearchController>(SearchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.Search.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/search/universities',
            function SearchController_SearchUniversities(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                    take: {"default":10,"in":"query","name":"take","dataType":"double"},
                    content_language: {"default":"en","in":"query","name":"content_language","dataType":"string"},
                    name: {"in":"query","name":"name","dataType":"string"},
                    country: {"in":"query","name":"country","dataType":"string"},
                    type: {"in":"query","name":"type","dataType":"string"},
                    sponsorship: {"in":"query","name":"sponsorship","dataType":"string"},
                    number_of_students: {"in":"query","name":"number_of_students","ref":"StudentNumber"},
                    financial_segment: {"in":"query","name":"financial_segment","dataType":"string"},
                    core_study_program_slug: {"in":"query","name":"core_study_program_slug","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<SearchController>(SearchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.SearchUniversities.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/search/studyprograms',
            function SearchController_SearchStudyPrograms(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    name: {"in":"query","name":"name","dataType":"string"},
                    graduation: {"in":"query","name":"graduation","dataType":"string"},
                    languages: {"in":"query","name":"languages","dataType":"string"},
                    country: {"in":"query","name":"country","dataType":"string"},
                    admission_semesters: {"in":"query","name":"admission_semesters","dataType":"string"},
                    study_forms: {"in":"query","name":"study_forms","dataType":"string"},
                    financial_segment: {"in":"query","name":"financial_segment","dataType":"string"},
                    core_study_program_slug: {"in":"query","name":"core_study_program_slug","dataType":"string"},
                    skip: {"default":0,"in":"query","name":"skip","dataType":"double"},
                    take: {"default":10,"in":"query","name":"take","dataType":"double"},
                    content_language: {"default":"en","in":"query","name":"content_language","dataType":"string"},
                    university_id: {"in":"query","name":"university_id","dataType":"string"},
                    location: {"in":"query","name":"location","dataType":"string"},
                    category_ids: {"in":"query","name":"category_ids","dataType":"string"},
                    study_program_ids: {"in":"query","name":"study_program_ids","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<SearchController>(SearchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.SearchStudyPrograms.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
