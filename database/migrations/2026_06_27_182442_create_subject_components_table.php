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
        Schema::create('subject_components', function (Blueprint $table) {
            $table->id();
          $table->foreignId('class_subject_plan_id')->constrained('class_subject_plans')->onDelete('cascade');
            $table->string('component_name'); // شفهي، خطي، عملي...
            $table->tinyInteger('sai_number'); // يحدد في أي سعي يطبق هذا التقسيم (1، 2، 3، 4)
            $table->decimal('max_component_score', 5, 2); // العلامة القصوى للجزء في هذا السعي
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_components');
    }
};
