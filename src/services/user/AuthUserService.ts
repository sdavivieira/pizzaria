import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import{sign} from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  password: string
}
class AuthUserService{
  async execute({email, password}: AuthRequest){
//verificando se o email existe
const user = await prismaClient.user.findFirst({
  where:{
    email:email
  }
})
  if(!user)
  {
    throw new Error("User/password incorrect")
  }
  //preciso verificar se a senha está correta
  const passwordMatch = await compare(password, user.password)

  if(!passwordMatch)
  {
    throw new Error("User/password incorrect")
  }
  //Se der tudo certo, gerar o token do usuário

  const token = sign(
    {
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: '30d'
    }
  )

return {
  id: user.id,
  name: user.name,
  email: user.email,
  token:token
  }
}
}
export {AuthUserService}