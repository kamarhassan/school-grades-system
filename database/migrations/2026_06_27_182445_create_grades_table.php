<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('exam_id')
                ->constrained('exams')
                ->cascadeOnDelete();
            $table->foreignId('assessment_type_id')
                ->constrained('assessment_types')
                ->cascadeOnDelete();

            $table->foreignId('class_id')
                ->constrained('classes')
                ->cascadeOnDelete();

            $table->foreignId('section_id')
                ->constrained('sections')
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->constrained('students')
                ->cascadeOnDelete();

            $table->foreignId('class_subject_id')
                ->constrained('class_subjects')
                ->cascadeOnDelete();

            // NULL إذا كانت المادة بدون مكونات فرعية
            $table->foreignId('subject_component_id')
                ->nullable()
                ->constrained('subject_components')
                ->cascadeOnDelete();

            // nullable لأن الدرجة قد لا تكون أُدخلت بعد
            $table->decimal('score', 5, 2)->nullable();

            $table->timestamps();

            // لتسريع جلب درجات شعبة في امتحان معيّن
            $table->index(['exam_id', 'class_id', 'section_id']);
            $table->index(['exam_id', 'student_id']);
        });

        DB::statement("
            ALTER TABLE grades
            ADD COLUMN subject_component_key BIGINT UNSIGNED
            GENERATED ALWAYS AS (IFNULL(subject_component_id, 0)) STORED
        ");

        DB::statement("
            ALTER TABLE grades
            ADD UNIQUE KEY uq_grade (exam_id, student_id, class_subject_id, subject_component_key)
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};