package transfer

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// Request request
func Request(method string, uri string, requestBody []byte) ([]byte, error) {
	fmt.Println("###url ", uri)
	req, err := http.NewRequest(method, uri, bytes.NewBuffer(requestBody))
	req.Header.Set("Content-type", "application/json")
	if err != nil {
		log.Println("Unable to make a New Request :: ", err)
		return nil, err
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("Unable to Read All Response Body ::", err)
		return nil, err
	}

	return body, nil

}
