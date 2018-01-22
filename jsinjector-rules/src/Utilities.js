/**
 * Utilities.js
 *
 * Created by carlo- on 22/01/2018.
 * Copyright © 2018 Carlo Rapisarda. All rights reserved.
 *
 */

/* global process */
import _ from "lodash";

/**** Constants ****/
export const DEBUG_LOG = true;
/**** ********* ****/

export const safari = window.safari;

export const isDevBuild = () => (
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
);

export const triggerFileDownload = (filename, rawText) => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(rawText));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const isValidRule = (rule) => (
    rule &&
    (typeof rule === "object") &&
    (typeof rule["enabled"] === "boolean") &&
    (typeof rule["match"] === "string") &&
    (typeof rule["trigger"] === "string") &&
    (typeof rule["injection"] === "string") &&
    (typeof rule["id"] === "string") &&
    (rule["match"] === "exact" || rule["match"] === "prefix" || rule["match"] === "contained")
);

export const isValidRules = (rules) => (
    rules &&
    (typeof rules === "object") &&
    (rules.filter((r) => isValidRule(r)).length === rules.length)
);

export const newRule = () => {
    const id = _.random(0,100000000000000000) + "";
    return {
        enabled: true,
        match: "exact",
        trigger: "",
        injection: "// Rule ID: "+id+"\n// Code to be injected here...",
        id,
    };
};

export const log = (...args) => {
    if (DEBUG_LOG) {console.log(...args);}
};
