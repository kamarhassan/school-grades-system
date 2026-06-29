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
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('class_subject_plan_id')->constrained('class_subject_plans')->onDelete('cascade'); // الخطة تحدد المادة والسنة
            
            $table->tinyInteger('sai_number')->nullable(); // مؤشر السعي الحالي
            
            // يربط بالجزء إذا كان السعي مقسماً، ويكون null إذا ألغي التقسيم أو كنا في الفاينل
            $table->foreignId('subject_component_id')->nullable()->constrained('subject_components')->onDelete('cascade');
            
            $table->decimal('sai_score', 5, 2)->nullable(); // علامة السعي (جزء أو كتلة واحدة)
            
            // علامات امتحانات الفصول النهائية (مباشرة دون تقسيم دائماً)
            $table->decimal('exam_term_1', 5, 2)->nullable();
            $table->decimal('exam_term_2', 5, 2)->nullable();
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
