// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');
// Set the region 
AWS.config.update({region: 'us-east-1'});

class Email {

    sendEmail (email_address)  {
        // test an email templact
        let params = {
            Destination: { /* required */
              BccAddresses: [],
              CcAddresses: [],
              ToAddresses: ['robinkurosawa@gmail.com']
            },
            Source: 'admin@opencreditx.com', /* required */
            Template: 'email-signup', /* required */
            TemplateData: '{}', /* required */
            // ConfigurationSetName: '',
            ReplyToAddresses: ['admin@opencreditx.com'],
            // ReturnPath: 'admin@opencreditx.com',
            // ReturnPathArn: 'STRING_VALUE',
            // SourceArn: 'STRING_VALUE',
            Tags: [],
          };
    
        let templatePromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise()
        
        return templatePromise
        
    }
}

export default Email