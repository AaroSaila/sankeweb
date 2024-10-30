package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("./static/"))
	mux.Handle("/", fs)

	log.Print("Listening on 8080...")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
