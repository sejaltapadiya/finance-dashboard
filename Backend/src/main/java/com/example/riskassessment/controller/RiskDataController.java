package com.example.riskassessment.controller;

import com.example.riskassessment.model.RiskData;
import com.example.riskassessment.service.RiskDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RiskDataController {
    @Autowired
    private RiskDataService service;

    @GetMapping
    public List<RiskData> getAllData() {
        return service.getAllRiskData();
    }

    @GetMapping("/{id}")
    public RiskData getDataById(@PathVariable Long id) {
        return service.getRiskDataById(id);
    }
    @PostMapping
    public RiskData createRiskData(@RequestBody RiskData data) {
        System.out.println("Saved");
        return service.saveRiskData(data);
    }


    @PutMapping("/{id}")
    public RiskData updateRiskData(@PathVariable Long id, @RequestBody RiskData updatedData) {
        return service.updateRiskData(id, updatedData);
    }


    @DeleteMapping("/{id}")
    public void deleteRiskData(@PathVariable Long id) {
        service.deleteRiskData(id);
    }

    @GetMapping("/employment-status")
    public ResponseEntity<List<RiskData>> getByEmploymentStatus(@RequestParam String status) {
        return ResponseEntity.ok(service.getByEmploymentStatus(status));
    }

    @GetMapping("/city")
    public ResponseEntity<List<RiskData>> getByCity(@RequestParam String city) {
        return ResponseEntity.ok(service.getByCity(city));
    }

    @GetMapping("/state")
    public ResponseEntity<List<RiskData>> getByState(@RequestParam String state) {
        return ResponseEntity.ok(service.getByState(state));
    }

    @GetMapping("/country")
    public ResponseEntity<List<RiskData>> getByCountry(@RequestParam String country) {
        return ResponseEntity.ok(service.getByCountry(country));
    }

    @GetMapping("/debt-to-income-ratio")
    public ResponseEntity<List<RiskData>> getByDebtToIncomeRatio(@RequestParam double ratio) {
        return ResponseEntity.ok(service.getByDebtToIncomeRatio(ratio));
    }

    @GetMapping("/dependents")
    public ResponseEntity<List<RiskData>> getByNumberOfDependents(@RequestParam int dependents) {
        return ResponseEntity.ok(service.getByNumberOfDependents(dependents));
    }

    @GetMapping("/loan-amount-range")
    public ResponseEntity<List<RiskData>> getByLoanAmountRange(@RequestParam double min, @RequestParam double max) {
        return ResponseEntity.ok(service.getByLoanAmountRange(min, max));
    }

    @GetMapping("/credit-score-trend")
    public ResponseEntity<List<Map<String, Object>>> getCreditScoreTrend() {
        // Logic to retrieve credit score trend
        return ResponseEntity.ok(service.getCreditScoreTrend());
    }
}
