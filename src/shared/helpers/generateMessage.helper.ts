
export enum ReasonType {
  NEW="new",
  RECOVER="recover",
  CHANGE="change"
}

export const generateMessage = (email:string, reason?:ReasonType, password?:string) => {
  
  let message:string;

  if(reason===ReasonType.NEW){
    message = `
      <h1 align="center">🐾🐾 SOCIETY FOR THE PROTECTION OF ANIMALS 🐾🐾</h1>
      <h3>This information is really important, please be careful with this email</h3>
      <h5 style="color:gray" align="center">The SPA doesn't be responsible</h5>
      <h5 align="center">NEW USER</h5>
      <p>New user of SPA user: ${email}</p>
      <p>New user password of SPA: ${password}</p>
      <h3>**Remember to change this password for your security at the first time logging**</h3>
      <h5 style="color:red">If you have any problem, you can contact with the admin of the page</h5>
      <h5 align="center">"Thanks for your registration"</h5>
      `;
    }
    
    if(reason===ReasonType.RECOVER){
      message = `
      <h1 align="center">🐾🐾 SOCIETY FOR THE PROTECTION OF ANIMALS 🐾🐾</h1>
      <h3>This information is really important, please be careful with this email</h3>
      <h5 style="color:gray" align="center">The SPA doesn't be responsible</h5>
      <h5 align="center">RECOVER PASSWORD</h5>
      <p>Your new password: ${password}</p>
      <h3>**Remember to change this new password for your security at the first time logging**</h3>
      <h5 style="color:red">If you have any problem, you can contact with the admin of the page</h5>
      <h5 align="center">"Thanks for recovering your account"</h5>
      `;
    }
    
    if(reason===ReasonType.CHANGE){
      message = `
      <h1 align="center">🐾🐾 SOCIETY FOR THE PROTECTION OF ANIMALS 🐾🐾</h1>
      <h3>This information is really important, please be careful with this email</h3>
      <h5 style="color:gray" align="center">The SPA doesn't be responsible</h5>
      <h5 align="center">CHANGE PASSWORD</h5>
      <p> The reason for this message is only to notify you that your password has been changed. </p>
      <h3>**Remember to change this password for your security at the first time logging**</h3>
      <h5 style="color:red">If you don't change your password, you maybe can recover your account or contact with a admin</h5>
      <h5 style="color:red">If you have any problem, you can contact with the admin of the page</h5>
      <h5 align="center">"Thanks for your attention"</h5>
    `;
  }

  return message
}