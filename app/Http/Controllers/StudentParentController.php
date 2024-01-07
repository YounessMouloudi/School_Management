<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use DateTime;
use Illuminate\Support\Facades\Date;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
        $formFields = $request->validated();
        $formFields['last_login_date'] = new DateTime();
        $parent = StudentParent::create($formFields);
        
        return new StudentParentResource($parent); 

        /* hna drna had resource bach nraj3o les données l api 9bal mayraj3o lina qu'a réponse w values 3adiyin
        had resource tayssla7 bach anak tatmodifié f structure dial hadok les données li tssefto par ex:
            - njibo ghi les données li bghina ybano (name,age,date)
            - had les données 3awtani n9dero nt7akmo f smia kifach ghaybano par ex: phone nsmiwha => téléphone
            - n9adero ndiro chi des relations f resource w nraj3o les données li 3andhom 3ala9a b had relation
            
        mhm général tat7akam f structure dial les données li ghaybano w ghi li m7adedin f model ama li f hidden
        hadok 3amrhom ybano ila la drnahom f fillable
        w had resource n9adro nsta3mloha hna f store aw f update aw delete
        */
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
    public function update(UpdateStudentParentRequest $request, StudentParent $studentParent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $studentParent)
    {
        //
    }
}
