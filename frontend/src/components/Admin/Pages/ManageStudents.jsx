import { useStudentContext } from "../../../context/StudentContext"
import { StudentApi } from "../../../service/StudentApi";
import { AdminStudentList } from "../Data-Table/AdminStudentList";
import { StudentForm } from "../Forms/StudentForm";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

export function ManageStudents() {

    const {user} = useStudentContext();
    
    return  <> 
                <div className="relative overflow-x-auto w-full">
                    <div className="hidden md:block">
                        <div className="">
                            <div className="bg-background">
                                <div className="grid">
                                    <div className="col-span-3 lg:col-span-4">
                                        <div className="h-full py-6 px-4">
                                            <Tabs defaultValue="students_list" className="h-full space-y-6">
                                                <div className="space-between flex items-center">
                                                    <TabsList>
                                                        <TabsTrigger value="students_list" className="relative">
                                                            Students
                                                        </TabsTrigger>
                                                        <TabsTrigger value="add_student">
                                                            Add New Student
                                                        </TabsTrigger>
                                                    </TabsList>
                                                </div>
                                                <TabsContent value="students_list" className="border-none p-0 outline-none">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                                All Students
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <Separator className="my-4"/>
                                                    <div className="relative">
                                                        <ScrollArea>
                                                            <div className="">
                                                                <AdminStudentList/>
                                                            </div>
                                                            <ScrollBar orientation="horizontal"/>
                                                        </ScrollArea>
                                                    </div>
                                                </TabsContent>
                                                <TabsContent value="add_student">
                                                    <Separator className="my-4"/>
                                                    <div className="space-y-1">
                                                        <StudentForm handleSubmitForm={(values) => StudentApi.create(values)} />
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
}