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
        Schema::create('class_assessment_types', function (Blueprint $table) {
           $table->id();
            $table->foreignId('class_id')->constrained('school_classes')->onDelete('cascade');
            $table->foreignId('assessment_type_id')->constrained('assessment_types')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // منع تكرار نفس التقييم لنفس الصف
            $table->unique(['class_id', 'assessment_type_id']);
        });
        if (Schema::hasColumn('assessment_types', 'is_active')) {
            Schema::table('assessment_types', function (Blueprint $table) {
                $table->dropColumn('is_active');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_assessment_types');
    }
};
