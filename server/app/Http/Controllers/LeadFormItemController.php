<?php

namespace App\Http\Controllers;

use App\LeadFormItem;
use Illuminate\Http\Request;

class LeadFormItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\LeadFormItem  $leadFormItem
     * @return \Illuminate\Http\Response
     */
    public function show(LeadFormItem $leadFormItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\LeadFormItem  $leadFormItem
     * @return \Illuminate\Http\Response
     */
    public function edit(LeadFormItem $leadFormItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LeadFormItem  $leadFormItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LeadFormItem $leadFormItem)
    {
        $formItem = LeadFormItem::find($request->id);

        // create options
        // create stuff
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LeadFormItem  $leadFormItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(LeadFormItem $leadFormItem)
    {
        //
    }
}
