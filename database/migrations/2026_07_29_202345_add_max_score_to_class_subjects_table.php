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
        Schema::table('class_subjects', function (Blueprint $table) {
            // إضافة حقل العلامة القصوى الكلية للمادة في هذا الصف
            $table->decimal('max_score', 5, 2)
                  ->nullable()
                  ->after('academic_year_id')
                  ->comment('العلامة الكلية للمادة الخاصة بهذا الصف');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('class_subjects', function (Blueprint $table) {
            $table->dropColumn('max_score');
        });
    }
};