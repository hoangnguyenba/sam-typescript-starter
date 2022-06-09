import { middyfy } from '@libs/lambda';
import { getTemplateByCode } from '@domains/communication-template'

import handlebars from 'handlebars'


export type GenerateHTMLEventRequest = {
  real_time: boolean,
  template_code: string,
  language?: string,
  channel: string,
  data: object
}

export type GenerateHTMLEventResponse = {
  real_time: boolean,
  channel: string,
  storage_path: string
}

/**
 *
 * @param {GenerateHTMLEventRequest} event
 *
 * @returns {GenerateHTMLEventResponse}
 *
 */
const _lambdaHandler = async (event: GenerateHTMLEventRequest): Promise<GenerateHTMLEventResponse> => {
    
    const template = await getTemplateByCode(event.template_code, event.language)

    if (!template) {
      throw Error('Invalid template')
    }

    const html = handlebars.compile(template)(event.data)

    // upload to s3

    return {
      real_time: event.real_time,
      channel: event.channel,
      storage_path: html
  };
};

export const lambdaHandler = middyfy(_lambdaHandler);