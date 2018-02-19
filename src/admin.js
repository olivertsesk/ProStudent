/**
 * Created by Dennis Liu on 2018. 2. 19..
 */

import * as admin from 'firebase-admin';

// var serviceAccount = require('keys/prostudent-e0ac1-firebase-adminsdk-m0h3g-5685a2c795.json');

export const init=()=>{
    admin.initializeApp({
        credential: admin.credential.cert({
          "type": "service_account",
          "project_id": "prostudent-e0ac1",
          "private_key_id": "841bebf213b6a20b99fca022ff52200ffb1a7567",
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJxGYweUp7d+PL\np/tjKzXSXtm2d9ZdMopSVPfZ+PWKAYmqqzAfXKOC9/g1mzyb3Eulo5Z7UMQlzQMu\nVJNCISvoalQQuxfooTJx4IIQrM0DXhineWzBeWri2RmgJ8SbQO4HJt42ZGwI3PJ/\n5LmoHg0nO+7xo2ZB+QdnYyGtiOlt9ikwgRPTiKVhbwQmPOpr3V5/lgoZWnW/IMU0\ndLoh/wnDCOTqxvtdPbZUsMPnjqYmczCqZD01YvNKhVE6KNUlasrhTaKvbxUi4a95\nEEeol2nR7DU7tdxP/KlMVrOLPk/hg1QOtE4OWKjljzw0rL2P1N7cA9UsyD33q8r6\nq4fwyfIxAgMBAAECggEAEl87TNumgBKdH+y2U8PZ/UNcwKQt1UOmW7PX87WbKgtU\nzUEUOy7Uxrasl7kAblLDYpxANg9XJPgDe6MA26sok9umtvVKSojvDnZ6cWlCq7VU\nOl+wmvdi17AcCLzGRrrFUcpkvoArZC02OZYKn7fIy9NFwSP3SjeSSIQ6y1Hlq3ju\nyEXm7OJM/HZL0rnKbCgu0lEEmu2aZcP5MOaL5wrQISbI+xlk3E1PaAWRps7a3DIR\n5dD/CmBpBoAVov7aU1GpECMNBrT9qqvqSRHj44kgUYS+6vG5/m13gzBP2hUhiOVS\n4PqcFA7B/Ihm8wqnkYKr8tNth6KUcG9JBcDJ1RrQSQKBgQDk9icu5KNWEXeu8Drk\n+SYtnOT96urgOy6uwYcJjy0lTX1wF/gDaxkRxoMEqgJkffacIrKgN/EUkCj/OwpM\n66boZiGmeKJRM5tQeZnz8MWAUcW3M9MNDrdiCOhrSPePlHr+SrzJmBzov0l5NV9f\nDnzB4ql6IQeSWp72a+MfK1MdrQKBgQDhmB7bT8CHiq7Mv4mN7wLSqGYQPNdMySW3\n8qDzqe7n//ZP6e+5QxCZmhWQ5K6nf5BfxOTRwuPFa99Dg8N3FIIKK+O2/ENt9UF7\ngURk8fgOPMZQviLnRZVqlYaPtjY1ZIaeNX/pltJ+87MGvL1qrnazsyzpCf0ynboU\ndEeD89TvFQKBgQC6aacxSLmrY4FcDv8EWc25qVnPWips8gJqCerV35pUGqkcUId+\n0P2SOVuGupxEEUJtkNp6E9HWeiDG3NzgD6TO5ghTrzgIgMndVYQA1nEWrn0ZUbpt\nkSPBT5tbbgcRAUS6MUNPpucyoDtD0i6aCAOPH+n4I1g00k9GNkSupel/6QKBgQDV\nAmb4W5iGIvukFqLSYsD+mcUtRdVhCnjT9IPnLyiG5Rf1IwWYn2t4LZZ5ZoRHYdq3\notkP+v5Ide+s9yhEMxgKdKCiMhWVKMO40zj6O8Ml5lq2+KFKUFih+CfDYKBUz+OQ\nVSG/NQryljcPgH010x//04nvTOBHv8ho8dZpEH2ZdQKBgGSmUjcXVHpaL2nsPfcJ\nqFsp3j9JRZyM7DfeJiHemeWfD7AmATQB5gb7PahB4upEoyebasomXBZ+8X+1zT15\n6iJzsJ8O91n2AWWljJNw3xTFfQGmRQVNPG9mbRNZWpVLn+Ml86vTcVP3RNvwNGRv\nSPpRM1u4hkRJbsnrEL36Ttk2\n-----END PRIVATE KEY-----\n",
          "client_email": "firebase-adminsdk-m0h3g@prostudent-e0ac1.iam.gserviceaccount.com",
          "client_id": "116066887530413108268",
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://accounts.google.com/o/oauth2/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m0h3g%40prostudent-e0ac1.iam.gserviceaccount.com"
        }),
        databaseURL: 'https://prostudent-e0ac1.firebaseio.com/'
    });
}
