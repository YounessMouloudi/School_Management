/* 
- hadik formSchema li derna rah hia lvalidation dial lform tandiroha b zod 
*/

import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Loader } from "lucide-react"
import { useStudentContext } from "../../context/StudentContext"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  email : z.string().email().min(2).max(50),
  password : z.string().min(8).max(50)
})

export function StudentLogin() {
    
    const {login,setAuthenticated,authenticated} = useStudentContext();

    const navigate = useNavigate();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        
        // defaultValues: {
        //   email : "ali@gmail.com",
        //   password : "aaaaaaaa",
        // },
    })

    const {handleSubmit,setError,formState:{isSubmitting}} = form;
    
    const onSubmit = async values => {
        // const axios = axiosStudent.defaults // hada fih des donnnés dial navigator (headers,adapter,baseUrl,...)
        await login(values.email,values.password).then(
            
            (value) => {

                if(value.status === 204) {
                    
                    setAuthenticated(true);
                    navigate('/student/dashboard');
                }
            }
        ).catch(
            ({response}) => {
                setError('email',{
                    message : response.data.message
                    // message : response.data.errors.email.join()
                });
                
            }
        );
    }

    return  <>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="password" render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type={'password'} placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting && <Loader className="me-2 animate-spin"/> }Submit
                        </Button>
                    </form>
                </Form>
            </>
}