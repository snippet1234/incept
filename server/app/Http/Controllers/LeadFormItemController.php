<?php

namespace App\Http\Controllers;

use App\LeadFormItem;
use Illuminate\Http\Request;
use App\LeadForm;
use App\LeadFormItemOption;
use Illuminate\Support\Facades\Response;

class LeadFormItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($form)
    {
        return LeadForm::find($form)->items()->with(['type', 'options'])->get();
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
    public function store(Request $request, $form)
    {

        $formItem = new LeadFormItem();
        $formItem->type()->associate($request->type);
        $formItem->form()->associate($form);

        $formItem->name = $request->name;
        $formItem->placeholder = $request->placeholder;
        $formItem->label = $request->name;
        $formItem->save();

        if($request->has('options')) {
            foreach($request->options as $option) {
                $option = new LeadFormItemOption(['value' =>$option]);
                $formItem->options()->save($option);
            }    
        }

        $formItem->options;
        $formItem->type;
        return $formItem;
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
    public function update(Request $request,  $leadForm, $formItem)
    {
        $formItem = LeadFormItem::find($formItem);

        foreach($formItem->options as $option) {
            $option->delete();
        }

        $formItem->type()->associate($request->type);
        $formItem->name = $request->name;
        $formItem->placeholder = $request->placeholder;
        $formItem->label = $request->name;
        
        $formItem->save();
        if($request->has('options')) {
            foreach($request->options as $option) {
                $option = new LeadFormItemOption(['value' =>$option]);
                $formItem->options()->save($option);
            }    
        }


        return $formItem;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LeadFormItem  $leadFormItem
     * @return \Illuminate\Http\Response
     */
    public function destroy( $form, $leadFormItem)
    {
        LeadFormItem::find($leadFormItem)->delete();
        return Response::json(['deleted' => true]);
    }
}
