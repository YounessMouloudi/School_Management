<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email,'.$this->id,
            'password' => 'required|min:8',
            'blood_type' => ['required', Rule::enum(BloodEnum::class)],
            // 'student_parent_id'=> 'required|max:10|exists:student_parents,id',
            'student_parent_id'=> Rule::exists('student_parents','id'),
        ];
    }
}
