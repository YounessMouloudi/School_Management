import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Loader } from "lucide-react"
import { ParentApi } from "../../service/ParentApi"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  firstname : z.string().min(3).max(50),
  lastname : z.string().min(3).max(50),
  date_of_birth : z.string(),
  gender : z.string().max(1),
  email : z.string().email().min(3).max(50),
  password : z.string().min(8).max(50),
  phone : z.string().min(10).max(10),
  address : z.string().min(5).max(255),
})

export function ParentCreateForm() {
        
    const form = useForm({
        resolver: zodResolver(formSchema),
        
        defaultValues: {
          firstname : "",
          lastname : "",
          date_of_birth : "",
          gender : "",
          email : "",
          password : "",
          phone : "",
          address : "",
        },
    })

    const { toast } = useToast();

    const {handleSubmit,setError,formState:{isSubmitting},reset} = form;
    
    const onSubmit = async values => {

        await ParentApi.create(values).then(
            
            ({status,data}) => {
                if(status === 201) {
                    console.log(data);

                    toast({
                        title: "Success",
                        description: "Parent Created Successfully",
                        style : {
                            backgroundColor: '#16a34a',
                            color : '#fff'
                        }
                    });
                    reset();
                }
            }
        ).catch(
            ({response}) => {
                Object.entries(response.data.errors).forEach((error) => {
                    const [fieldName,errorMessages] = error;
                    setError(fieldName,{
                        "message" : errorMessages.join()
                    })
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Parent already exists",
                    });
                });

            }
        );
    }

    return  <>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="firstname" render={({field}) => (
                            <FormItem>
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input placeholder="FirstName" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="lastname" render={({field}) => (
                            <FormItem>
                                <FormLabel>LastName</FormLabel>
                                <FormControl>
                                    <Input placeholder="LastName" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="date_of_birth" render={({field}) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type={'date'} placeholder="Date of Birth" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="gender" render={({field}) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                        className="flex flex-col space-y-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="m"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">Male</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="f"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">Female</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type={'email'} placeholder="Email" {...field} />
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
                        <FormField control={form.control} name="phone" render={({field}) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type={'tel'} placeholder="Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="address" render={({field}) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Address" className="resize-none" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting && <Loader className="me-2 animate-spin"/> }Create
                        </Button>
                    </form>
                </Form>
            </>
}