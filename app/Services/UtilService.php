<?php
namespace App\Services;

use GuzzleHttp\Client;

class UtilService {

    public function getNextPageInfo($response)
    {
        $linkHeader = $response->getHeaderLine('Link');
        if (!$linkHeader) {
            return null;
        }

        preg_match('/<([^>]+)>; rel="next"/', $linkHeader, $matches);
        return isset($matches[1]) ? $matches[1] : null;
    }
}
?>
