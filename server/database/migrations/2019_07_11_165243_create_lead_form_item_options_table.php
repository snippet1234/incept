<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadFormItemOprtionsTable extends Migration
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
            $table->integer('lead_form_item_id')->unsigned();
            $table->foreign('lead_form_item_id')->references('id')->on('lead_form_items')->onDelete('cascade');
            $table->timestamps();
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
