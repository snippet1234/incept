<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadFormItemOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lead_form_item_options', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('value');
            $table->bigInteger('lead_form_item_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('lead_form_item_options', function ($table) {
            $table->foreign('lead_form_item_id')->references('id')->on('lead_form_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lead_form_item_options');
    }
}
