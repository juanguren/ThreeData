import sendGrid from "@sendgrid/mail";
import { constructMessageLayout } from "../view/messageTemplate";

const sendMessageWithData = async (userData: any, openData: Array<object>) => {
  const { email } = userData;
  const SENDGRID_KEY = process.env.SENDGRID_KEY!;
  try {
    sendGrid.setApiKey(SENDGRID_KEY);
    const messageBody: any = {
      to: email,
      from: "juanararo@unisabana.edu.co",
      subject: "HEY!",
    };
    const messageLayout = constructMessageLayout(openData, userData);
    messageBody.html = messageLayout;

    const messageResponse = await sendGrid.send(messageBody);
    const code = messageResponse[0].statusCode;
    return {
      status: code,
      message: `Package succesfully sent to ${email}`,
    };
  } catch (error) {
    return {
      status: error.statusCode ? error.statusCode : undefined,
      message: "Error in Message Operation",
      error,
    };
  }
};

export default sendMessageWithData;
