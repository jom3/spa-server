import { generate } from "generate-password";

export const passwordGenerator = () => {
  const password = generate({
    length: 15,
    lowercase:true,
    uppercase:true,
    numbers: true
  });
  return password
}