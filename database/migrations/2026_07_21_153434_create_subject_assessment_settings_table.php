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
        Schema::create('subject_assessment_settings', function (Blueprint $table) {
            $table->id();
         
    $table->foreignId('class_subject_id')
        ->constrained('class_subjects')
        ->cascadeOnDelete();

    $table->foreignId('assessment_type_id')
        ->constrained('assessment_types')
        ->cascadeOnDelete();

    // هل يوجد تشعيب؟
    $table->boolean('is_split')
        ->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_assessment_settings');
    }
};
