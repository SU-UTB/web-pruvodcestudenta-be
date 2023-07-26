<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use GuzzleHttp;
use SendinBlue\Client\Api\ContactsApi;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\CreateContact;


class EmailSendingController extends Controller
{

    private static function initialize()
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', env('SENDINBLUE_API_KEY'));

        $apiInstance = new TransactionalEmailsApi(
        // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
        // This is optional, `GuzzleHttp\Client` will be used as default.
            new GuzzleHttp\Client(),
            $config
        );

        try {
            $result = $apiInstance;
            return $result;
        } catch (Exception $e) {
            echo 'Exception when calling instance$apiInstanceApi->getinstance$apiInstance: ', $e->getMessage(), PHP_EOL;
        }
    }

    private static function initializeContacts()
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', env('SENDINBLUE_API_KEY'));

        $apiInstance = new ContactsApi(
            new GuzzleHttp\Client(),
            $config
        );

        try {
            $result = $apiInstance;
            return $result;
        } catch (Exception $e) {
            echo 'Exception when calling instance$apiInstanceApi->getinstance$apiInstance: ', $e->getMessage(), PHP_EOL;
        }
    }


    public static function sendEmail(EmailContent $type, $data, $startDate)
    {
        $apiInstance = EmailSendingController::initialize();

        $qrCZData = file_get_contents(dirname(__DIR__, 2) . '/View/Email/QRs/QRPlatba_na_ucet- CZK.png');
        $qrSKData = file_get_contents(dirname(__DIR__, 2) . '/View/Email/QRs/QRPlatba_na_ucet- EUR.png');
        $qrCZ = chunk_split(base64_encode($qrCZData));
        $qrSK = chunk_split(base64_encode($qrSKData));

        $sendSmtpEmail = new \SendinBlue\Client\Model\SendSmtpEmail(
            [
                'subject' => EmailSendingController::getEmailSubject($type, $data),
                'sender' => array('name' => 'Seznamovák UTB', 'email' => 'seznamovak@sutb.cz'),
                'to' => array(
                    array('email' => $data['email'], 'name' => $data['name'], 'surname' => $data['surname'])
                ),
                'htmlContent' => EmailSendingController::getEmailContent($type, $data),
                'params' => [
                    'turnusNumber' => $data['batch'],
                    'turnusDate' => Carbon::parse($startDate)->format('d.m.Y'),
                    'reservationId' => $data['id']
                ],

                'attachment' =>
                    ($type === EmailContent::Reserve) ? array([
                        'content' => $qrCZ,
                        'name' => 'QRPlatba_na_ucet- CZK.png'
                    ], [
                        'content' => $qrSK,
                        'name' => 'QRPlatba_na_ucet- EUR.png'
                    ]) : null
            ]
        );


        try {
            $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            echo 'Exception when calling TransactionalEmailsApi->sendTransacEmail: ', $e->getMessage(), PHP_EOL;
        }
    }

    private static function getEmailContent(EmailContent $type, $data)
    {
        switch ($type) {
            case EmailContent::Reserve:
                return
                    !self::isSubstitute($data) ?
                        file_get_contents(dirname(__DIR__, 2) . '/View/Email/ReservationTemplate.htm')
                        : file_get_contents(dirname(__DIR__, 2) . '/View/Email/ReservationSubstituteTemplate.htm');
            case EmailContent::Cancel:
                return file_get_contents(dirname(__DIR__, 2) . '/View/Email/CancelTemplate.htm');
            case EmailContent::AfterPay:
                return file_get_contents(dirname(__DIR__, 2) . '/View/Email/AfterPaymentTemplate.htm');
        }
    }

    private static function getEmailSubject(EmailContent $type, $data)
    {
        switch ($type) {
            case EmailContent::Reserve:
                return !self::isSubstitute($data) ? 'Seznamovák UTB 2023 - Potvrzení rezervace' : 'Seznamovák UTB 2023 - Rezervace náhradníka';
            case EmailContent::Cancel:
                return 'Seznamovák UTB 2023 - Zrušení rezervace';
            case EmailContent::AfterPay:
                return 'Seznamovák UTB 2023 - Zaplacení rezervace';
        }
    }

    public static function createContact($email)
    {
        $apiInstance = EmailSendingController::initializeContacts();
        $createContact = new CreateContact(
            [
                'email' => $email,
                'listIds' => [3],
                'updateEnabled' => true
            ]);

        try {
            $result = $apiInstance->createContact($createContact);
        } catch (Exception $e) {
            echo 'Exception when calling ContactsApi->createContact: ', $e->getMessage(), PHP_EOL;
        }
    }

    /**
     * @param $reservation
     * @return bool
     */
    public static function isSubstitute($reservation): bool
    {
        return $reservation['is_substitute'] === 1;
    }
}

enum EmailContent
{
    case Reserve;
    case Cancel;
    case AfterPay;
}
