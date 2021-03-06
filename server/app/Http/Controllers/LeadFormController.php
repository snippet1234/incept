<?php

namespace App\Http\Controllers;

use App\LeadForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\FormItemType;

class LeadFormController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Auth::user()->forms()->with(['items.type', 'items.options'])->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\LeadForm  $leadForm
     * @return \Illuminate\Http\Response
     */
    public function show($leadForm)
    {
        return LeadForm::find($leadForm)->with(['items.type', 'items.options'])->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\LeadForm  $leadForm
     * @return \Illuminate\Http\Response
     */
    public function edit(LeadForm $leadForm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LeadForm  $leadForm
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LeadForm $leadForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LeadForm  $leadForm
     * @return \Illuminate\Http\Response
     */
    public function destroy(LeadForm $leadForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function formItemTypes(Request $request)
    {
        return FormItemType::all();
    }
}
