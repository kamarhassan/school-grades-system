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
        Schema::table('subject_components', function (Blueprint $table) {
            // 1. إضافة حقل الربط بـ class_subject_id
            $table->foreignId('class_subject_id')
                  ->nullable() // نضعه nullable مؤقتاً لتجنب المشاكل مع البيانات القديمة إن وجدت
                  ->after('id')
                  ->constrained('class_subjects')
                  ->onDelete('cascade');

            // 2. جعل subject_id اختياري أو إزالته لاحقاً لأن class_subject يحتوي بالفعل على subject_id
            $table->unsignedBigInteger('subject_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subject_components', function (Blueprint $table) {
            $table->dropForeign(['class_subject_id']);
            $table->dropColumn('class_subject_id');
            $table->unsignedBigInteger('subject_id')->nullable(false)->change();
        });
    }
};