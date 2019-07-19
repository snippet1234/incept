<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadFormItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lead_form_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('label');
            $table->string('placeholder');

            $table->bigInteger('lead_form_id')->unsigned();
            $table->bigInteger('form_item_type_id')->unsigned();

            $table->timestamps();
        });

        Schema::table('lead_form_items', function ($table) {
            $table->foreign('lead_form_id')->references('id')->on('lead_forms')->onDelete('cascade');
            $table->foreign('form_item_type_id')->references('id')->on('form_item_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lead_form_items');
    }
}
