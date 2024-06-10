<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentParentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required|max:50',
            'lastname' => 'required|max:50',
            'date_of_birth' => 'required|date',
            'gender' => ['required', Rule::in(['m','f'])],
            'email' => 'required|email|unique:student_parents,email,'.$this->id,
            'password' => 'required|min:8',
            'phone' => Rule::unique("student_parents")->ignore($this->id),
            /* hna f phone ima dir b7al haka aw dir b7al email => 3lach darna haka ay 3tinaha dak l'id hit 
            mnin ghadi ndiro update 3ndna phone w email unique ay ghadi yl9a déja dik la donné alors bach 
            y ignoriha w ykhliha w ydir update bla machakil */
            'address' => 'required|max:255',
        ];
    }
}
