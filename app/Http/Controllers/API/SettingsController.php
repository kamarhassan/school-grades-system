<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\AcademicYear;
use App\Models\User;
use Illuminate\Http\Request;

class SettingsController extends Controller
{




    public function index()
    {
        // بدلاً من where('role', 'Supervisor')
        // نستخدم scope الحزمة لجلب كل من يملك رتبة أو صلاحية Supervisor
        $supervisors = User::role('Supervisor')->get();
        // dd($supervisors); // تحقق من البيانات المسترجعة
        // أو إذا كنت تفلتر بناءً على صلاحية معينة مباشرة:
        // $supervisors = User::permission('supervise-sections')->get();

        // جلب جميع الشُّعب والصفوف المتاحة في النظام بالكامل
        $allSections = Section::with('schoolClass')->get();

        // بناء هيكلية البيانات المجمعة لترسل إلى الـ React
        $responseData = $supervisors->map(function ($supervisor) use ($allSections) {
            return [
                'supervisor_id'   => $supervisor->id,
                'supervisor_name' => $supervisor->name,
                'sections' => $allSections->map(function ($section) use ($supervisor) {
                    return [
                        'section_id'   => $section->id,
                        'section_name' => $section->section_name,
                        'class_id' => $section->class_id,
                        'class_name'   => $section->schoolClass ? $section->schoolClass->class_name : null,
                        'is_assigned'  => $section->supervisor_id == $supervisor->id,
                        'current_supervisor_id' => $section->supervisor_id,
                    ];
                })
            ];
        });

        return response()->json([
            'status' => 'success',
            'data'   => $responseData
        ], 200);
    }

    /**
     * إنشاء شعبة جديدة وربطها بصف وبناظر محدد
     */
    public function store(Request $request)
    {
        $lastAcademicYear = AcademicYear::latest('id')->first();

        if (!$lastAcademicYear) {
            return response()->json([
                'status' => 'error',
                'message' => 'لم يتم العثور على أي عام دراسي.'
            ], 404);
        }


        $request->validate([
            'assignments' => 'required|array',

            'assignments.*.section_id' => [
                'required',
                'exists:sections,id',
            ],

            'assignments.*.class_id' => [
                'required',
                'exists:school_classes,id',
            ],

            'assignments.*.supervisor_id' => [
                'required',
                'exists:users,id',
            ],
        ]);


        // IDs الشعب التي تم إرسالها
        $sectionIds = collect($request->assignments)
            ->pluck('section_id')
            ->toArray();


        // إلغاء أي تعيينات قديمة غير موجودة في الطلب
        Section::where('academic_year_id', $lastAcademicYear->id)
            ->whereNotIn('id', $sectionIds)
            ->update([
                'supervisor_id' => null
            ]);


        // حفظ التعيينات الجديدة
        foreach ($request->assignments as $assignment) {

            Section::where('id', $assignment['section_id'])
                ->where('academic_year_id', $lastAcademicYear->id)
                ->update([
                    'class_id' => $assignment['class_id'],
                    'supervisor_id' => $assignment['supervisor_id'],
                ]);
        }


        $allAssignments = Section::where('academic_year_id', $lastAcademicYear->id)
            ->with([
                'schoolClass:id,class_name',
                'supervisor:id,name,email'
            ])
            ->get();


        return response()->json([
            'status' => 'success',
            'message' => 'تم تحديث تعيينات الشعب للنظار بنجاح.',
            'assignments' => $allAssignments,
            'total_count' => $allAssignments->count(),
        ]);
    }

    /**
     * تحديث بيانات الشعبة (نقلها لصف آخر، تغيير اسمها، أو تغيير الناظر المسؤول عنها)
     */


    /**
     * حذف شعبة (مع الحذر من وجود طلاب مرتبطين بها)
     */
    public function destroy($id)
    {
        $section = Section::findOrFail($id);

        // تحقق مما إذا كان هناك طلاب في هذه الشعبة قبل الحذف لمنع أخطاء قاعدة البيانات
        if ($section->students()->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'لا يمكن حذف هذه الشعبة لوجود طلاب مسجلين بداخلها حالياً.'
            ], 400);
        }

        $section->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'تم حذف الشعبة بنجاح.'
        ], 200);
    }
}
