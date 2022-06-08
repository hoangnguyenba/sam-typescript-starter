import { lambdaHandler, GenerateHTMLEventResponse, GenerateHTMLEventRequest } from '../../app';

describe('Unit test for generate HTML handler', function () {

    it('verifies successful response', async () => {
        const event: GenerateHTMLEventRequest = {
            "real_time": true,
            "template_code":"hoang-demo",
            "channel":"Print,SMS",
            "data":{
                "name": "Hoang"
            }
        };
        const result: GenerateHTMLEventResponse = await lambdaHandler(event);

        expect(result.real_time).toEqual(event.real_time);
        expect(result.channel).toEqual(event.channel);
    });
});
