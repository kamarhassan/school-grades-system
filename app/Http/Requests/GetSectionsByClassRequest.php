<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class GetSectionsByClassRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
  public function rules(): array
    {
        return [
            'class_id' => 'required|exists:school_classes,id'
        ];
    }

    /**
     * تخصيص رسائل الخطأ (اختياري) باللغة العربية.
     */
    public function messages(): array
    {
        return [
            'class_id.required' => 'يجب إرسال رقم الصف الدراسي (class_id).',
            'class_id.exists'   => 'رقم الصف الدراسي المحدد غير موجود في قاعدة البيانات.',
        ];
    }
}
