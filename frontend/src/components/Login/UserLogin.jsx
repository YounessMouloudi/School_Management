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
import { Admin_Dashboard_Route, Parent_Dashboard_Route, Student_Dashboard_Route, Teacher_Dashboard_Route, redirectToDashboard } from "../../router"

const formSchema = z.object({
  email : z.string().email().min(2).max(50),
  password : z.string().min(8).max(50)
})

export function UserLogin() {
    
    const {login,setAuthenticated,setToken} = useStudentContext();

    const navigate = useNavigate();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        
        defaultValues: {
          email : "",
          password : "",
        },
    })

    const {handleSubmit,setError,formState:{isSubmitting}} = form;
    
    const onSubmit = async values => {
        // const axios = axiosClient.defaults // hada fih des donnnés dial navigator (headers,adapter,baseUrl,...)
        await login(values.email,values.password).then(
            
            (value) => {

                if(value.status === 200) {

                    setToken(value.data.token);
                    setAuthenticated(true);

                    const {role} = value.data.user;
                    // had navigate 3awdnaha blasst switch
                    navigate(redirectToDashboard(role));

                    // switch (role){
                    //     case 'student':
                    //         navigate(Student_Dashboard_Route);
                    //         break;
                    //     case 'admin':
                    //         navigate(Admin_Dashboard_Route);
                    //         break;
                    //     case 'teacher':
                    //         navigate(Teacher_Dashboard_Route);
                    //         break;
                    //     case 'parent':
                    //         navigate(Parent_Dashboard_Route);
                    //         break;
                    // } 

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