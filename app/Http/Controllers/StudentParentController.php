<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $columns = $request->get('columns');
        $parents = !empty($columns) ? StudentParent::all($columns) : StudentParent::all();
        return StudentParentResource::collection($parents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $formFields['last_login_date'] = new DateTime();
        $parent = StudentParent::create($formFields);
        
        /* hna drna had resource bach nraj3o les données l api 9bal mayraj3o lina qu'a réponse w values 3adiyin
        had resource tayssla7 bach anak tatmodifié f structure dial hadok les données li tssefto par ex:
            - njibo ghi les données li bghina ybano (name,age,date)
            - had les données 3awtani n9dero nt7akmo f smia kifach ghaybano par ex: phone nsmiwha => téléphone
            - n9adero ndiro chi des relations f resource w nraj3o les données li 3andhom 3ala9a b had relation
            
        mhm général tat7akam f structure dial les données li ghaybano w ghi li m7adedin f model ama li f hidden
        hadok 3amrhom ybano ila la drnahom f fillable
        w had resource n9adro nsta3mloha hna f store aw f update aw delete
        */

        // hna kona tanraj3o direct resource db modifina structure w ghanraj3o json 
        // return new StudentParentResource($parent); 

        $response = new StudentParentResource($parent);
        
        return response()->json([
            'parent' => $response,
            'message' => __("Parent Created Successfully")
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {   
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $parent->update($formFields);

        return response()->json([
            'parent' => $parent,
            'message' => __("Parent Updated Successfully")
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $parent)
    {
        $parent->delete();
    }
}
