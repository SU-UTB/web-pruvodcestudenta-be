<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExternalApiController extends Controller
{

    public function postReservationEmail(Request $request)
    {
        $reservation = $request->all()[0];
        $startDate = $request->all()['startDate'];
        try {

            EmailSendingController::sendEmail(EmailContent::Reserve, $reservation, $startDate);
            return response("ok");
        } catch (\Exception $e) {
            return response($e);
        }
    }

    public function postCreateContact(Request $request)
    {
        $email = $request->all()['email'];
        try {
            EmailSendingController::createContact($email);
            return response("ok");
        } catch (\Exception $e) {
            return response($e);
        }

    }

    public function postCancelEmail(Request $request)
    {
        $reservation = $request->all()[0];
        $startDate = $request->all()['startDate'];
        try {

            EmailSendingController::sendEmail(EmailContent::Cancel, $reservation, $startDate);
            return response("ok");
        } catch (\Exception $e) {
            return response($e);
        }
    }

    public function postAfterPayEmail(Request $request)
    {
        $reservation = $request->all()[0];
        $startDate = $request->all()['startDate'];
        try {

            EmailSendingController::sendEmail(EmailContent::AfterPay, $reservation, $startDate);
            return response("ok");
        } catch (\Exception $e) {
            return response($e);
        }
    }
}
