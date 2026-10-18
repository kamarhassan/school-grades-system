<?php
// app/Http/Requests/SaveAllGradesRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveAllGradesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermissionTo('edit grades') ?? false;
    }

    public function rules(): array
    {
        return [
            'class_id'   => ['required', 'integer', 'exists:school_classes,id'],
            'section_id' => ['required', 'integer', 'exists:sections,id'],
            'exam_id'    => ['required', 'integer', 'exists:assessment_types,id'],

            'students'                    => ['required', 'array', 'min:1'],
            'students.*.student_id'       => ['required', 'integer', 'distinct', 'exists:students,id'],
            'students.*.grades'           => ['required', 'array', 'min:1'],

            'students.*.grades.*.class_subject_id'     => ['required', 'integer', 'exists:class_subjects,id'],
            'students.*.grades.*.subject_component_id' => ['nullable', 'integer', 'exists:subject_components,id'],
            'students.*.grades.*.grade' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'students.*.student_id.distinct' => 'يوجد طالب مكرر في الطلب.',
            'students.*.grades.*.grade.numeric' => 'العلامة يجب أن تكون رقماً.',
            'students.*.grades.*.grade.min' => 'العلامة لا يمكن أن تكون سالبة.',
        ];
    }

    public function failedAuthorization()
    {
        abort(response()->json(['error' => 'لا تملك صلاحية تعديل ورصد العلامات.'], 403));
    }
}
