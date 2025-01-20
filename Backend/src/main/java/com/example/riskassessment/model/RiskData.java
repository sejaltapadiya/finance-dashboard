package com.example.riskassessment.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "risk_data")
public class RiskData {

    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("age")
    private int age;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("education_level")
    private String educationLevel;

    @JsonProperty("marital_status")
    private String maritalStatus;

    @JsonProperty("income")
    private double income;

    @JsonProperty("credit_score")
    private int creditScore;

    @JsonProperty("loan_amount")
    private double loanAmount;

    @JsonProperty("loan_purpose")
    private String loanPurpose;

    @JsonProperty("employment_status")
    private String employmentStatus;

    @JsonProperty("years_at_current_job")
    private int yearsAtCurrentJob;

    @JsonProperty("payment_history")
    private String paymentHistory;

    @JsonProperty("debt_to_income_ratio")
    private double debtToIncomeRatio;

    @JsonProperty("assets_value")
    private double assetsValue;

    @JsonProperty("number_of_dependents")
    private int numberOfDependents;

    @JsonProperty("city")
    private String city;

    @JsonProperty("state")
    private String state;

    @JsonProperty("country")
    private String country;

    @JsonProperty("previous_defaults")
    private int previousDefaults;

    @JsonProperty("marital_status_change")
    private boolean maritalStatusChange;

    @JsonProperty("risk_rating")
    private String riskRating;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Getters
    public Long getId() { return id; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getEducationLevel() { return educationLevel; }
    public String getMaritalStatus() { return maritalStatus; }
    public double getIncome() { return income; }
    public int getCreditScore() { return creditScore; }
    public double getLoanAmount() { return loanAmount; }
    public String getLoanPurpose() { return loanPurpose; }
    public String getEmploymentStatus() { return employmentStatus; }
    public int getYearsAtCurrentJob() { return yearsAtCurrentJob; }
    public String getPaymentHistory() { return paymentHistory; }
    public double getDebtToIncomeRatio() { return debtToIncomeRatio; }
    public double getAssetsValue() { return assetsValue; }
    public int getNumberOfDependents() { return numberOfDependents; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getCountry() { return country; }
    public int getPreviousDefaults() { return previousDefaults; }
    public boolean isMaritalStatusChange() { return maritalStatusChange; }
    public String getRiskRating() { return riskRating; }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    // Setters
    public void setId(Long id) { this.id = id; }
    public void setAge(int age) { this.age = age; }
    public void setGender(String gender) { this.gender = gender; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }
    public void setIncome(double income) { this.income = income; }
    public void setCreditScore(int creditScore) { this.creditScore = creditScore; }
    public void setLoanAmount(double loanAmount) { this.loanAmount = loanAmount; }
    public void setLoanPurpose(String loanPurpose) { this.loanPurpose = loanPurpose; }
    public void setEmploymentStatus(String employmentStatus) { this.employmentStatus = employmentStatus; }
    public void setYearsAtCurrentJob(int yearsAtCurrentJob) { this.yearsAtCurrentJob = yearsAtCurrentJob; }
    public void setPaymentHistory(String paymentHistory) { this.paymentHistory = paymentHistory; }
    public void setDebtToIncomeRatio(double debtToIncomeRatio) { this.debtToIncomeRatio = debtToIncomeRatio; }
    public void setAssetsValue(double assetsValue) { this.assetsValue = assetsValue; }
    public void setNumberOfDependents(int numberOfDependents) { this.numberOfDependents = numberOfDependents; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setCountry(String country) { this.country = country; }
    public void setPreviousDefaults(int previousDefaults) { this.previousDefaults = previousDefaults; }
    public void setMaritalStatusChange(boolean maritalStatusChange) { this.maritalStatusChange = maritalStatusChange; }
    public void setRiskRating(String riskRating) { this.riskRating = riskRating; }
}