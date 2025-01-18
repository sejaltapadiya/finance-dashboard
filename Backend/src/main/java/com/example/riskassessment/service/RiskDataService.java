package com.example.riskassessment.service;

import com.example.riskassessment.model.RiskData;
import com.example.riskassessment.repository.RiskDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RiskDataService {
    @Autowired
    private RiskDataRepository repository;

    public List<RiskData> getAllRiskData() {
        List<RiskData> data = repository.findAll();
        return data;
    }

    public RiskData getRiskDataById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public RiskData saveRiskData(RiskData data) {
        return repository.save(data);
    }

    public RiskData updateRiskData(Long id, RiskData updatedData) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Data with ID " + id + " not found.");
        }
        return repository.findById(id).map(data -> {
            data.setGender(updatedData.getGender());
            data.setIncome(updatedData.getIncome());
            data.setLoanPurpose(updatedData.getLoanPurpose());
            data.setLoanAmount(updatedData.getLoanAmount());
            data.setAge(updatedData.getAge());
            data.setCreditScore(updatedData.getCreditScore());
            return repository.save(data);
        }).orElseThrow(() -> new RuntimeException("Unexpected Error during update"));
    }

    public void deleteRiskData(Long id) {
        repository.deleteById(id);
    }

    public List<RiskData> getByEmploymentStatus(String employmentStatus) {
        return repository.findByEmploymentStatus(employmentStatus);
    }

    public List<RiskData> getByCity(String city) {
        return repository.findByCity(city);
    }

    public List<RiskData> getByState(String state) {
        return repository.findByState(state);
    }

    public List<RiskData> getByCountry(String country) {
        return repository.findByCountry(country);
    }

    public List<RiskData> getByDebtToIncomeRatio(double ratio) {
        return repository.findByDebtToIncomeRatioGreaterThan(ratio);
    }

    public List<RiskData> getByNumberOfDependents(int dependents) {
        return repository.findByNumberOfDependents(dependents);
    }

    public List<RiskData> getByLoanAmountRange(double minAmount, double maxAmount) {
        return repository.findByLoanAmountBetween(minAmount, maxAmount);
    }
    public List<Map<String, Object>> getCreditScoreTrend() {
        System.out.println("kk");
        List<RiskData> riskDataList = repository.findAll();
        System.out.println("kk");
        return riskDataList.stream()
                .filter(riskData -> riskData.getCreatedAt() != null) // Ensure createdAt is not null
                .collect(Collectors.groupingBy(
                        riskData -> riskData.getCreatedAt().toLocalDate(), // Group by date
                        Collectors.averagingDouble(RiskData::getCreditScore) // Compute average credit score
                ))
                .entrySet()
                .stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", entry.getKey().toString());
                    map.put("average_credit_score", entry.getValue());
                    return map;
                })
                .collect(Collectors.toList());
    }


}
