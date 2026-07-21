<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();

            // الطالب
            $table->foreignId('student_id')
                ->constrained('students')
                ->cascadeOnDelete();


            // الصف + المادة
            $table->foreignId('class_subject_id')
                ->constrained('class_subjects')
                ->cascadeOnDelete();


            // نوع التقييم
            $table->foreignId('assessment_type_id')
                ->constrained('assessment_types')
                ->cascadeOnDelete();


            // الجزء (شفهي، خطي)
            // NULL في الامتحان الفصلي
            $table->foreignId('subject_component_id')
                ->nullable()
                ->constrained('subject_components')
                ->nullOnDelete();


            // الدرجة
            $table->decimal('score',5,2);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
