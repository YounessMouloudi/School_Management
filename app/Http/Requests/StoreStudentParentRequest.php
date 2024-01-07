<?php

namespace App\Http\Requests;

use App\Models\StudentParent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentParentRequest extends FormRequest
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
            'email' => 'required|email|unique:student_parents',
            'phone' => 'required|numeric|digits:10|unique:student_parents',
            'address' => 'required|max:255',

            // 'email' => 'required|email|unique:'.StudentParent::class,

            /* hadi hia tari9a dynamique bach tan liéew unique m3a smia dial table => w li hia tan3tiwha ghi smiat 
            la class w laravel tayjib smia dial table hadi tandiroha f 7alat ila bdelna smia dial table kol mera ay 
            bach unique yb9a liéé m3a table wakha bdelna lih smia machi kol mera bdelna smia dial table khass njiw 
            hna w n3awdo nmodifiw smia dial table*/
        ];
    }
}
