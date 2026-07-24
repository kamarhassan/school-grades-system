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
        Schema::table('class_assessment_types', function (Blueprint $table) {

            $table->foreignId('academic_year_id')
                ->after('class_id')
                ->constrained('academic_years')
                ->cascadeOnDelete();

            $table->unique([
                'academic_year_id',
                'class_id',
                'assessment_type_id'
            ], 'class_assessment_unique');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('class_assessment_types', function (Blueprint $table) {

            $table->dropUnique('class_assessment_unique');

            $table->dropForeign(['academic_year_id']);

            $table->dropColumn('academic_year_id');

        });
    }
};