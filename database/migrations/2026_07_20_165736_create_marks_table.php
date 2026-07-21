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
        Schema::create('marks', function (Blueprint $table) {
           $table->id();

    $table->foreignId('student_id')
        ->constrained()
        ->cascadeOnDelete();


    $table->foreignId('class_subject_id')
        ->constrained('class_subjects')
        ->cascadeOnDelete();


    $table->foreignId('assessment_type_id')
        ->constrained('assessment_types')
        ->cascadeOnDelete();


    $table->foreignId('subject_component_id')
        ->nullable()
        ->constrained('subject_components')
        ->nullOnDelete();


    $table->decimal('score',5,2);


    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marks');
    }
};
