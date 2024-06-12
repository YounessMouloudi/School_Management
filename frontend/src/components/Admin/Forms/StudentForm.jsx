import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Loader, XCircleIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { useEffect, useState } from "react"
import { ParentApi } from "../../../service/ParentApi"

const formSchema = z.object({
  firstname : z.string().min(3).max(50),
  lastname : z.string().min(3).max(50),
  date_of_birth : z.string(),
  gender : z.string().max(1),
  email : z.string().email().min(3).max(50),
  password : z.string().min(8).max(50),
  blood_type : z.string(),
  student_parent_id : z.string().max(10),
})

export function StudentForm({handleSubmitForm,values}) {
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        
        defaultValues: values || {},
    })
    
    const [parents,setParents] = useState([]);
    
    const isUpdate = values !== undefined;

    useEffect(() =>{
        ParentApi.all(['id','firstname','lastname']).then(({data}) => setParents(data.data));
    },[]);

    const {handleSubmit,setError,formState:{isSubmitting},reset} = form;
    
    const onSubmit = async values => {

        const loader = toast.loading( isUpdate ? "Updating in progress." : "Adding in progress.");

        await handleSubmitForm(values).then(
            
            ({status,data}) => {
                if(status === 200) {
                    console.log(data);
                    toast.success(data.message,{
                        duration : 3000,
                        style : {
                            backgroundColor: '#15803d',
                            color: '#ffffff'
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
                    toast("Error in Form",{
                        duration : 3000,
                        icon : <XCircleIcon/>,
                        style : {
                            backgroundColor: '#b91c1c',
                            color: '#ffffff'
                        }
                    });
                });

            }
        ).finally(() => {
            toast.dismiss(loader);
        });
    }

    return  <>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
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
                            <FormItem >
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
                            <FormItem className="mb-1">
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                                        className="flex flex-row space-x-1">
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
                        <FormField control={form.control} name="blood_type" render={({field}) => (
                            <FormItem>
                                <FormLabel>Blood Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Blood Type"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {["O-","O+","A-","A+","B-","B+","AB-","AB+"].map((bloodType,key) => 
                                        <SelectItem key={key} value={bloodType}>{bloodType}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="student_parent_id" render={({field}) => (
                            <FormItem>
                                <FormLabel>Parent</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Parent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {parents.map((parent,key) => 
                                        <SelectItem key={key} value={parent.id.toString()}>{parent.firstname} {parent.lastname}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
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
                            <FormItem className="mb-2">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type={'password'} placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting && <Loader className="me-2 animate-spin" /> }
                            {isUpdate ? "Update" : "Create"}
                        </Button>
                    </form>
                </Form>
            </>
}