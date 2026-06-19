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

    $table->foreignId('assessment_item_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('assessment_period_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->decimal('mark', 8, 2)
        ->nullable();

    $table->timestamps();

    $table->unique([
        'student_id',
        'assessment_item_id',
        'assessment_period_id'
    ], 'student_assessment_unique');
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
