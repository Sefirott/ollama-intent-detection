import Ajv from 'ajv';

export interface SSRResponse {
    ssr_type: string;
    description: string;
    availability: string;
    additional_info: string;
}

const schema = {
    type: 'object',
    properties: {
        ssr_type: { type: 'string' },
        description: { type: 'string' },
        availability: { type: 'string' },
        additional_info: { type: 'string' },
    },
    required: ['ssr_type', 'description', 'availability', 'additional_info'],
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

export function validateSSRResponse(json: any): json is SSRResponse {
    return validate(json);
}
