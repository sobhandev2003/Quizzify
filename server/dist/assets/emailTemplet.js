"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to generate HTML email template
function EmailTemplate(activationLink, activeTime, message) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizzify Account Verification</title>
    <style>
        /* Add your email styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-self: center;
        }

        h1 {
            color: #333333;
        }

        .logo {
            width: 8rem;
        }

        p {
            color: #666666;
        }

        button {
            background-color: #06129e;
            border: none;
            outline: none;
            padding: .5rem;
            width: 5.5rem;
            border-radius: 8px;
            box-shadow: 1px 2px 2px gray;
            cursor: pointer;
        }

        .activation-link {
            /* color: #007bff; */
            color: white;
            text-decoration: none;

            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 2px;
        }
        .activate_time{
            color:#eb2f06;
        }

        @media screen and (max-width:400px) {
            h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>

<body>
    <div class="container">

        <img src="https://drive.google.com/thumbnail?id=1Sx55Q0riatzqgISY51ZCbrsGcT4Zlmk3" alt="Logo"
            class="logo"></img>
           
        <h1>Welcome to Quizzify.</h1>

        <p>To ${message}, please click the following link:</p>
        <button><a href="${activationLink}" target="_blank" class="activation-link">Verify</a></button>
        <p class="activate_time">This link will be active until ${activeTime}.</p>
    </div>
</body>

</html>
    `;
}
exports.default = EmailTemplate;
//# sourceMappingURL=emailTemplet.js.map