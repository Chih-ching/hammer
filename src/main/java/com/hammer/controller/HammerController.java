package com.hammer.controller;

import com.hammer.dto.HammerInfo;
import com.hammer.dto.ProductInfo;
import com.hammer.service.HammerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Map;

@Controller
public class HammerController {

    @Autowired
    HammerService hammerService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/hammer")
    public String hammer() {
        return "pages/hammer/hammer";
    }

    @PostMapping("/hammerList")
    public String hammerList(Model model, @RequestBody ArrayList<HammerInfo> req) throws Exception {
        model.addAttribute("hammerList", req);
        return "pages/hammer/hammerList :: .hammers";
    }

    @PostMapping("/createReport")
    public String createReport(Model model, @RequestBody ArrayList<HammerInfo> req) throws Exception {
        Map<String, ArrayList<ProductInfo>> reportMap=hammerService.getReport(req);
        model.addAttribute("reportMap", reportMap);
        return "pages/hammer/report :: #report";
    }

}
