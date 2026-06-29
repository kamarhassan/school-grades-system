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
        Schema::create('class_subject_plans', function (Blueprint $table) {
            $table->id();
    
            $table->foreignId('class_id')->constrained('school_classes')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignId('academic_year_id')->constrained('academic_years')->onDelete('cascade'); // عزل خطة السنة
            
            // العلامات القصوى الافتراضية للمادة في السعي (في حال عدم وجود تقسيم)
            $table->decimal('max_sai_1', 5, 2)->default(40.00);
            $table->decimal('max_sai_2', 5, 2)->default(40.00);
            $table->decimal('max_sai_3', 5, 2)->default(40.00);
            $table->decimal('max_sai_4', 5, 2)->default(40.00);
            
            // علامات امتحانات الفصول (كتلة واحدة مباشرة للمادة دون تقسيم)
            $table->decimal('max_exam_term_1', 5, 2)->default(50.00);
            $table->decimal('max_exam_term_2', 5, 2)->default(50.00);

            // تفعيل أو إلغاء السعي بالكامل لحالات الطوارئ
            $table->boolean('is_sai_1_active')->default(true);
            $table->boolean('is_sai_2_active')->default(true);
            $table->boolean('is_sai_3_active')->default(true);
            $table->boolean('is_sai_4_active')->default(true);
            $table->boolean('is_exam_term_1_active')->default(true);
            $table->boolean('is_exam_term_2_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_subject_plans');
    }
};
