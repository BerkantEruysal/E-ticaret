import React, { useRef, useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export function useRequestSender(apiCall, payload) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    apiCall(payload)
      .then((result) => {
        setResult(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return [result, error, isLoading];
}

export function getLocationText(data) {
  let location = {};
  if (data.Country) {
    location.country = data.Country.Name;
    location.city = data.City.Name;
  } else if (data.SkiResort) {
    location.country = data.SkiResort.Country.Name;
    location.city = data.SkiResort.City.Name;
  } else {
    location = false;
  }
  return location;
}
